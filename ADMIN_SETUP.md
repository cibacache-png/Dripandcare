# Panel de Administración - Drip&Care

Acceso simple con contraseña, sin necesidad de crear usuarios en base de datos.

## Contraseña por defecto:

**Contraseña**: `danielarufs`

## Acceder al panel de administración:

1. En la página principal del sitio, haz clic en **Admin** en el menú superior
2. Ingresa la contraseña: `123456`
3. Haz clic en **Ingresar al Panel**

## Cambiar la contraseña:

Para cambiar la contraseña de administrador, edita el archivo:
`src/components/SimpleAuthContext.tsx`

Busca la línea:
```typescript
const ADMIN_PASSWORD = '123456';
```

Y cambia `'123456'` por la contraseña que desees.

## Funcionalidades del panel:

Una vez dentro, podrás editar:
- **Terapias Personalizadas**: Agregar, editar y eliminar los servicios de sueroterapia
- **Nutrientes de los Sueros**: Gestionar el glosario de nutrientes
- **Testimonios de Pacientes**: Administrar las reseñas de clientes
- **Referencias Científicas**: Actualizar el respaldo científico

## Seguridad:

- Cambia la contraseña predeterminada inmediatamente después del primer acceso
- No compartas las credenciales de administrador
- Considera usar una contraseña fuerte con letras, números y símbolos
