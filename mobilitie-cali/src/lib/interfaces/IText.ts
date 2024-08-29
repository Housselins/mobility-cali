export interface TextInterface {
  text: string;
  className?: string;
}

export interface LinkInterface extends TextInterface {
  keyLabel?: string;
  to?: string;
  execution?: () => void;
  classNameContainer?: string;
  rol?: number
}
