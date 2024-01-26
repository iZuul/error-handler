import * as yup from "yup";

const schema1 = yup.object({
  name: yup.string().required(),
  age: yup.string().required(),
});

type Schema1 = yup.InferType<typeof schema1>;

async function main() {
  const data: Schema1 = {
    age: "",
    name: "",
  };

  try {
    const result = await schema1.validate(data, { abortEarly: false });
    console.log("res ", result);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const err = {} as any;

      error.inner.forEach((_errInner) => {
        const path = _errInner.path as any;
        err[path] = _errInner.errors[0];
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
