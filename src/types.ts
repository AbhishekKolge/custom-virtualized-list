export type Dictionary = string[];

export type VirtualScrollProps = {
  optionHeight: number;
  selectHeight: number;
  visibilitySize: number;
  bufferSize: number;
};

export type RootLayoutProps = {
  children: React.ReactNode;
};

export type ErrorProps = {
  error: Error | unknown;
};

export type ComboBoxProps = {
  data: Dictionary;
};
