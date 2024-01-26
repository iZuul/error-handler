// zod has own safe handler
import { zodValidateHandler } from "@/helpers/errors/zod-handler";
import { z } from "zod";

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

  const result = await zodValidateHandler(() => schema1.safeParse(data));
  console.log(result);
}

main();
