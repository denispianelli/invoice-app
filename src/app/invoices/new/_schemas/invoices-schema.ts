import { z } from 'zod';

const DarftItemSchema = z.object({
  name: z.string(),
  quantity: z.coerce.number(),
  price: z.coerce.number(),
  total: z.coerce.number(),
});

const ItemSchema = z.object({
  name: z.string().min(1, 'Required'),
  quantity: z.coerce.number().min(1, 'Required').positive('Must be positive'),
  price: z.coerce.number().min(1, 'Required').positive('Must be positive'),
  total: z.coerce.number(),
});

export const DraftSchema = z
  .object({
    items: z.array(DarftItemSchema),
    'sender-street': z.string(),
    'sender-city': z.string(),
    'sender-postcode': z.string(),
    'sender-country': z.string(),
    'client-name': z.string(),
    'client-email': z.string(),
    'client-street': z.string(),
    'client-city': z.string(),
    'client-postcode': z.string(),
    'client-country': z.string(),
    'invoice-date': z.string(),
    'payment-terms': z.string(),
    'project-description': z.string(),
    status: z.string().min(1, 'Required'),
  })
  .required();

export const SendSchema = z.object({
  items: z.array(ItemSchema),
  'sender-street': z.string().min(1, 'Required'),
  'sender-city': z.string().min(1, 'Required'),
  'sender-postcode': z.string().min(1, 'Required'),
  'sender-country': z.string().min(1, 'Required'),
  'client-name': z.string().min(1, 'Required'),
  'client-email': z.string().email().min(1, 'Required'),
  'client-street': z.string().min(1, 'Required'),
  'client-city': z.string().min(1, 'Required'),
  'client-postcode': z.string().min(1, 'Required'),
  'client-country': z.string().min(1, 'Required'),
  'invoice-date': z.string().min(1, 'Required'),
  'payment-terms': z.string().min(1, 'Required'),
  'project-description': z.string().min(1, 'Required'),
  status: z.string().min(1, 'Required'),
});
