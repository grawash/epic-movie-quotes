import { defineRule } from "vee-validate";
import { required, email, min, numeric } from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("numeric", numeric);
defineRule("min", min);
