import { z } from "zod";

export const toolsQuerySchema = z.object({
  query: z.string().trim().max(120).optional(),
  category: z.string().trim().max(80).optional(),
  audience: z.enum(["b2b", "b2c", "both"]).optional(),
  page: z.coerce.number().int().min(1).max(1000).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(12),
});

export type ToolsQuery = z.infer<typeof toolsQuerySchema>;
