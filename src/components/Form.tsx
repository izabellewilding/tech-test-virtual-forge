import React, { useState, ChangeEvent, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { TextField } from "./TextField";
import { Checkbox } from "./Checkbox";
import { ButtonPrimary } from "./Button";

interface FormData {
  firstname: string;
  lastname: string;
  role: string;
  email: string;
  skills: string[];
}

export const Form = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    role: "",
    email: "",
    skills: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        skills: checked
          ? [...prevData.skills, value]
          : prevData.skills.filter((skill: any) => skill !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const mutation = useMutation({
    mutationFn: async (
      resource: Omit<FormData, "skills"> & { skills: number[] }
    ) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/resources`,
        resource
      );
      //@ts-ignore
      queryClient.invalidateQueries(["resourceData"]);
      router.push(`/${response.data.id}`);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (formData.skills.length >= 1) {
      mutation.mutate({
        ...formData,
        skills: formData.skills.map((s: string) => Number(s)),
      });
    } else {
      setError("Please select at least one skill");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-6">
      <div className="flex flex-row gap-4">
        <div>
          <TextField
            label="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />

          <TextField
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <TextField
          label="Last Name"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
      </div>

      <fieldset>
        <legend className="mb-2">Skills:</legend>
        <Checkbox
          name="AWS"
          value={"1"}
          checked={formData.skills.includes("1")}
          onChange={handleChange}
          label="AWS"
        />

        <Checkbox
          name="SQL"
          value={"2"}
          checked={formData.skills.includes("2")}
          onChange={handleChange}
          label="SQL"
        />

        <Checkbox
          name="javascript"
          value={"3"}
          checked={formData.skills.includes("3")}
          onChange={handleChange}
          label="JavaScript"
        />

        <Checkbox
          name="typescript"
          value={"4"}
          checked={formData.skills.includes("4")}
          onChange={handleChange}
          label="Typescript"
        />

        <Checkbox
          name="react"
          value={"5"}
          checked={formData.skills.includes("5")}
          onChange={handleChange}
          label="React"
        />

        <Checkbox
          name="vue"
          value={"6"}
          checked={formData.skills.includes("6")}
          onChange={handleChange}
          label="Vue"
        />

        <Checkbox
          name="node"
          value={"7"}
          checked={formData.skills.includes("7")}
          onChange={handleChange}
          label="Node"
        />
      </fieldset>
      {error && <div className="pt-3 text-red-600">{error}</div>}
      <div className="pt-8 max-w-36">
        <ButtonPrimary className="bg-indigo-300" type="submit">
          Save
        </ButtonPrimary>
      </div>
    </form>
  );
};

export default Form;
