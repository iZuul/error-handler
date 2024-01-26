import { yupValidateHandler } from "@/helpers/errors/yup-handler";
import * as yup from "yup";

const schema1 = yup.object({
  name: yup.string().trim().required(),
  age: yup.string().trim().required(),
});

type Schema1 = yup.InferType<typeof schema1>;

async function main() {
  const data: Schema1 = {
    age: "1",
    name: "1",
  };

  const result = await yupValidateHandler<Schema1>(
    schema1.validate(data, { abortEarly: false })
  );
  console.log(result);
}

main();
