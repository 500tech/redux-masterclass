// @flow
import React, { Node, useEffect } from 'react';
import forEach from 'lodash/forEach';
import { IntlProvider, addLocaleData } from 'react-intl';
import { useSelector, useActions } from 'hooks/redux.hooks';
import moment from 'moment';

import store from 'store';

import locales from 'constants/locales';

import type { State } from 'types/redux.types';

forEach(locales, (locale, key) =>
  moment.defineLocale(key, locale.dateTimeFormat)
);

// Go over all of the available locales and register them
forEach(locales, (value, key) => {
  addLocaleData({
    locale: key,
    // Couldn't find any documentation about 'pluralRuleFunction', throws error if not present
    pluralRuleFunction: () => {}
  });
});

type OwnProps = {
  children: Node
};

export const Localization = ({ children }: OwnProps) => {
  const locale: string = useSelector('localization.locale');

  useEffect(
    () => {
      moment.locale(locale);
    },
    [locale]
  );

  return (
    <IntlProvider
      locale={locale}
      key={locale}
      messages={locales[locale].translations}>
      {children}
    </IntlProvider>
  );
};

export default Localization;
