import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

const EditProduct = ({ product }) => {
  const [form, setForm] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    image: product.image,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateProduct();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);
  const updateProduct = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/products/${router.query.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const validate = () => {
    let err = {};

    if (!form.title) {
      err.title = "Title is required";
    }
    if (!form.description) {
      err.description = "Description is required";
    }
    if (!form.price) {
      err.price = "Price is required";
    }
    if (!form.image) {
      err.image = "Image is required";
    }
    return err;
  };

  return (
    <Card style={{ maxWidth: "50%", margin: "auto" }}>
      <h1> Create new Product</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline='centered' />
        ) : (
          // console.log(form)
          <form onSubmit={handleSubmit}>
            <Input
              style={{ display: "block", margin: "10px" }}
              placeholder='Title'
              label='Title'
              inputProps={{ "aria-label": "description" }}
              name='title'
              value={form.title}
              error={
                errors.title
                  ? {
                      content: "Please write a title",
                      pointing: "below",
                    }
                  : null
              }
              onChange={handleChange}
            />
            <Input
              style={{ display: "block", margin: "10px" }}
              placeholder='Description'
              inputProps={{ "aria-label": "description" }}
              name='description'
              value={form.description}
              error={
                errors.description
                  ? {
                      content: "Please write a title",
                      pointing: "below",
                    }
                  : null
              }
              onChange={handleChange}
            />
            <Input
              style={{ display: "block", margin: "10px" }}
              placeholder='Price'
              inputProps={{ "aria-label": "description" }}
              name='price'
              value={form.price}
              error={
                errors.price
                  ? {
                      content: "Please write a title",
                      pointing: "below",
                    }
                  : null
              }
              onChange={handleChange}
            />
            <Input
              style={{ display: "block", margin: "10px" }}
              placeholder='Image URL'
              inputProps={{ "aria-label": "description" }}
              name='image'
              value={form.image}
              error={
                errors.image
                  ? {
                      content: "Please write a image",
                      pointing: "below",
                    }
                  : null
              }
              onChange={handleChange}
            />

            <Button
              variant='contained'
              color='secondary'
              style={{ display: "block", width: "100%" }}
              type='submit'
            >
              UPDATE
            </Button>
          </form>
        )}
      </div>
    </Card>
  );
};
EditProduct.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  const { data } = await res.json();
  return { product: data };
};
export default EditProduct;
