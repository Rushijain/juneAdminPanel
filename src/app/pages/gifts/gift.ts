export class Gift {
  constructor(
    public id: string,
    public name: string,
    public gold: number,
    public dor: number,
    public common_item_1: number,
    public common_item_2: number,
    public rare_item_1: number,
    public rare_item_2: number,
    public epic_item_1: number,
    public epic_item_2: number,
    public en_title: string,
    public en_message: string,
    public sp_title: string,
    public sp_message: string,
    public fr_title: string,
    public fr_message: string,
    public it_title: string,
    public it_message: string,
    public ge_title: string,
    public ge_message: string,
  ){}
}
