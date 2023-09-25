import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  EmpowermentDoc: yup.object().shape({
    EmpowermentNo: yup.string().required("Bu maydon to'ldirilishi shart"),
    EmpowermentDateOfIssue: yup.mixed().required("Bu maydon to'ldirilishi shart"),
    EmpowermentDateOfExpire: yup.mixed().required("Bu maydon to'ldirilishi shart"),
  }),
  ContractDoc: yup.object().shape({
    ContractNo: yup.string().required("Bu maydon to'ldirilishi shart"),
    ContractDate: yup.mixed().required("Bu maydon to'ldirilishi shart"),
  }),
  Agent: yup.object().shape({
    AgentTin: yup.string().required("Bu maydon to'ldirilishi shart"),
    JobTitle: yup.string().required("Bu maydon to'ldirilishi shart"),
    Fio: yup.string().required("Bu maydon to'ldirilishi shart"),
    Passport: yup.object().shape({
      Number: yup.string().required("Bu maydon to'ldirilishi shart"),
      DateOfIssue: yup.mixed().required("Bu maydon to'ldirilishi shart"),
      IssuedBy: yup.string().required("Bu maydon to'ldirilishi shart"),
    })
  }),
  SellerTin: yup.string().required("Bu maydon to'ldirilishi shart"),
  BuyerTin: yup.string().required("Bu maydon to'ldirilishi shart"),
  Seller: yup.object().shape({
    Name: yup.string().required("Bu maydon to'ldirilishi shart"),
    DistrictId: yup.mixed().required("Bu maydon to'ldirilishi shart"),
  }),
  Buyer: yup.object().shape({
    Name: yup.string().required("Bu maydon to'ldirilishi shart"),
    DistrictId: yup.mixed().required("Bu maydon to'ldirilishi shart"),
  }),
})