import { ColunmAction } from './colunn-action';

export class GridBody {
  public id: number | string;
  public order: number;
  public titles: string[];
  public tooltip: string[];
  public type: string;
  public active: boolean;
  public link: string[];
  public actions: ColunmAction[];
  public decorate: string[];
}
