import * as yup from 'yup'

const validationSchema = yup.object().shape({
  actDoc: yup.object().shape({
    actNo: yup.string().required('Required'),
    actDate: yup.date().typeError('Type error').required('Required'),
  }),
  contractDoc: yup.object().shape({
    contractNo: yup.string().required('Required'),
    contractDate: yup.date().typeError('Type error').required('Required'),
  }),
  sellerTin: yup.string().required('Required'),
  sellerName: yup.string().required('Required'),
  buyerTin: yup.string().required('Required'),
  buyerName: yup.string().required('Required')
})

export default validationSchema