/**
 * app/admin/products/types.ts
 *
 * Tipos compartidos para el módulo de Gestión de Inventario.
 * Importados por data.ts y todos los componentes del módulo.
 *
 * En producción estos tipos se alinearían con los DTOs de la API de productos.
 * Estructura análoga a app/admin/orders/types.ts y app/admin/users/types.ts.
 */

export type ProductStatus = 'active' | 'low_stock' | 'out_of_stock' | 'draft';

export interface Product {
  id:       string;
  name:     string;
  sku:      string;
  price:    number;
  stock:    number;
  status:   ProductStatus;
  category: string;
  image:    string;
}
