  // Validation Schema using Yup
  import { data } from '@/app/api/DummyData/data';
import * as Yup from 'yup';

export const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .max(100, "Title must be less than 100 characters"),
    description: Yup.string()
      .required("Description is required")
      .max(500, "Description must be less than 500 characters"),
    location: Yup.string().required("Location is required"),
    tags: Yup.array()
    .of(
      Yup.string()
        .oneOf(data.map(option => option.name), 'Invalid tag') // Ensure the tag is a valid option
        .required('Tag is required') // Ensure each tag is not empty
    )
    .min(1, 'At least one tag is required') // Optional: Ensure at least one tag is selected
    .required('Tags are required'), 
  });
  