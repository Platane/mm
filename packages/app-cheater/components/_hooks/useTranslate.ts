import translation from "../../assets/translations/en";

// hacky way to get translation keys
type R = <T extends string>(tr: Record<T, string>) => T;
const r: R = (() => 0) as any;
const a = r(translation);
type Key = typeof a;

const t = (key: Key) => translation[key];

const context = { t };

export const useTranslate = () => context;
