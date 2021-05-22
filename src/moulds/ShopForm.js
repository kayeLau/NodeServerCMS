const Yup = require('yup');

exports.createShopFormSchema = () =>
    Yup.object({
        name:Yup.string()
        .required('店舖名不能為空')
        .min(3,'店舖名至少3個字符')
        .max(20,'店铺名不可超過 20 字')
    })