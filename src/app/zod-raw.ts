// zod has own safe handler
import { zodValidateHandler } from "@/helpers/errors/zod-handler";
import { ZodError, z } from "zod";

const schema1 = z.object({
  name: z.string().trim().min(1, "name is required!"),
  age: z.string().trim().min(1, "age is required!"),
});

type Schema1 = z.infer<typeof schema1>;

async function main() {
  const data: Schema1 = {
    name: "",
    age: "",
  };

  try {
    const result = await schema1.parseAsync(data);
    console.log("res ", result);
  } catch (error) {
    if (error instanceof ZodError) {
      const err = {} as any;

      error.errors.forEach((_errItem) => {
        const path = _errItem.path[0] as any;
        err[path] = _errItem.message;
      });

      const _err = { success: false, error: err };
      console.log("err ", _err);

      return _err;
    }

    const _err = { success: false, error };
    console.log("err ", _err);

    return _err;
  }
}

main();
