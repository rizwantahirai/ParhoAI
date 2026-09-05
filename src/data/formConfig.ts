/**
 * Application-form destination, committed on purpose.
 *
 * These ids are public by nature — they ship in the browser bundle whatever we do —
 * so keeping them here means no Vercel environment variables and no rebuild dance.
 * Environment variables (NEXT_PUBLIC_FORM_*) still override them if ever set.
 *
 * To (re)generate after changing the Google Form:
 *   node scripts/google-form-ids.mjs "https://docs.google.com/forms/d/e/<id>/viewform"
 */
export const GOOGLE_FORM = {
  /** The long id from .../forms/d/e/<THIS>/viewform. Empty = form not connected yet. */
  id: "",
  fields: {
    name:       "",
    email:      "",
    program:    "",
    background: "",
    goal:       "",
    github:     "",
  },
};
