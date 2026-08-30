import type { SchemaTypeDefinition } from 'sanity';
import { homeMosaic } from '@/sanity/schemaTypes/homeMosaic';
import { photographyGallery } from '@/sanity/schemaTypes/photography';
import { videographyPage } from '@/sanity/schemaTypes/videography';

export const schemaTypes: SchemaTypeDefinition[] = [
  photographyGallery,
  videographyPage,
  homeMosaic,
];
