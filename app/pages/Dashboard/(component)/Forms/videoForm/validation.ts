import { data } from '@/app/api/DummyData/data';
import * as Yup from 'yup';

export const validationSchema = Yup.object({
    content: Yup.string().required('Content is required'),
    caption: Yup.string().required('Caption is required'),
    tags: Yup.array()
    .of(Yup.object().shape({
      value: Yup.string().oneOf(data.map(d => d.name), 'Invalid tag').required(),
      label: Yup.string().required()
    }))
    .min(1, 'At least one tag is required'),    location: Yup.string().required('Location is required'),
    thumbnail: Yup.mixed<File>()
      .required('Thumbnail is required')
      .test('fileType', 'Thumbnail must be an image (jpg, jpeg, or png)', (value) => {
        return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
      }),
    banner: Yup.mixed<File>()
      .required('Banner is required')
      .test('fileType', 'Banner must be an image (jpg, jpeg, or png)', (value) => {
        return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
      }),
    fullVideo: Yup.mixed<File>()
      .required('Full video is required')
      .test('fileType', 'Full video must be a video file (mp4, mov)', (value) => {
        return value && ['video/mp4', 'video/quicktime'].includes(value.type);
      }),
  });