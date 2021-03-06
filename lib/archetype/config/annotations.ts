/**
 * Annotations Configuration
 * (app.config.annotations)
 *
 * Configure route, policy annotations, add custom annotation
 *
 * @see {@link https://github.com/jaumard/spool-annotations}
 */
export const annotations = {
  policy: true, // Enable @Policy
  route: true, // Enable @Route
  pathToScan: './api/controllers', // Where to search controllers
  customAnnotations: {} // Add custom annotations here
}
