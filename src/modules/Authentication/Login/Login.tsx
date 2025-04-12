import React from 'react'
import { Trans, useTranslation } from 'react-i18next';
import { changeLanguage } from '../../Locales/i18n';

const Login = () => {
  const { t, i18n } = useTranslation();

  return (<>
  
  <div>Login</div>

  <h1>{t("welcome")}</h1>
      <button  style={{ fontWeight: i18n.resolvedLanguage === "en" ? 'bold' : 'normal' }} onClick={() => changeLanguage("en")}>English</button>
      <button  style={{ fontWeight: i18n.resolvedLanguage === "ar"? 'bold' : 'normal' }} onClick={() => changeLanguage("ar")}>العربية</button>
  </>
  )
}

export default Login