import { defineRule } from "vee-validate";
import {
  required,
  email,
  min,
  max,
  numeric,
  confirmed,
} from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("numeric", numeric);
defineRule("min", min);
defineRule("max", max);
defineRule("confirmed", confirmed);
