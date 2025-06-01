/**
 * Helper to normalize ID
 */
export function normalizeId(ret: any) {
  if (ret._id && typeof ret._id === "object" && ret._id.toString) {
    if (typeof ret.id === "undefined") {
      ret.id = ret._id.toString();
    }
  }
  if (typeof ret._id !== "undefined") {
    delete ret._id;
  }
}

/**
 * Helper to remove private paths
 */
export function removePrivatePaths(ret: any, schema: any) {
  for (const path in schema.paths) {
    if (schema.paths[path].options && schema.paths[path].options.private) {
      if (typeof ret[path] !== "undefined") {
        delete ret[path];
      }
    }
  }
}

/**
 * Helper to remove version
 */
export function removeVersion(ret: any) {
  if (typeof ret.__v !== "undefined") {
    delete ret.__v;
  }
}

/**
 * Default toJSON implementation for mongoose schema's
 */
export const toJson = (schema: any) => {
  //NOTE: this plugin is actually called *after* any schema's
  //custom toJSON has been defined, so we need to ensure not to
  //overwrite it. Hence, we remember it here and call it later
  let transform: any = null;
  if (schema.options.toJSON && schema.options.toJSON.transform) {
    transform = schema.options.toJSON.transform;
  }

  //Extend toJSON options
  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(doc: any, ret: any, options: any) {
      //Remove private paths
      if (schema.options.removePrivatePaths !== false) {
        removePrivatePaths(ret, schema);
      }

      //Remove version
      if (schema.options.removeVersion !== false) {
        removeVersion(ret);
      }

      //Normalize ID
      if (schema.options.normalizeId !== false) {
        normalizeId(ret);
      }

      //Call custom transform if present
      if (transform) {
        return transform(doc, ret, options);
      }

      //Return
      return ret;
    },
  });
};
