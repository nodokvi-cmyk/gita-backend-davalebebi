import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'pino-nestjs';
import { SwaggerModule, type OpenAPIObject } from '@nestjs/swagger';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as yaml from 'js-yaml';

/**
 * The API contract lives in `src/yaml` as plain YAML files (one per
 * resource), so the controllers stay free of Swagger decorators.
 *
 * Resource fragments merged on top of `src/yaml/openapi.yaml`.
 */
const YAML_RESOURCES = ['app', 'auth', 'users', 'products', 'expenses'];

function resolveYamlFile(fileName: string): string {
  const candidates = [
    join(process.cwd(), 'src', 'yaml', fileName),
    join(__dirname, '..', 'src', 'yaml', fileName),
    join(process.cwd(), 'yaml', fileName),
    join(__dirname, '..', 'yaml', fileName),
    join(__dirname, 'yaml', fileName),
  ];

  const found = candidates.find((candidate) => existsSync(candidate));
  if (!found) {
    throw new Error(
      `OpenAPI YAML file "${fileName}" not found. Looked in:\n${candidates.join('\n')}`,
    );
  }
  return found;
}

function readYaml(fileName: string): OpenAPIObject {
  return yaml.load(
    readFileSync(resolveYamlFile(fileName), 'utf8'),
  ) as OpenAPIObject;
}

/** Loads the base document and merges every resource fragment into it. */
function buildOpenApiDocument(): OpenAPIObject {
  const document = readYaml('openapi.yaml');

  for (const resource of YAML_RESOURCES) {
    const fragment = readYaml(`${resource}.yaml`);

    if (fragment.paths) {
      Object.assign(document.paths, fragment.paths);
    }

    if (fragment.components?.schemas) {
      document.components = document.components ?? {};
      document.components.schemas = document.components.schemas ?? {};
      Object.assign(document.components.schemas, fragment.components.schemas);
    }
  }

  return document;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // API docs are served straight from the YAML specs in the `yaml` folder.
  SwaggerModule.setup('docs', app, buildOpenApiDocument(), {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
