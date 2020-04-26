export class Tournament {
    constructor(
      public title: string,
      public description: string,
      public category: number,
      public seconds: number,
      public dor: number,
      public start_time: number,
      public end_time: number,
      public entry_fees: string,
      public ucoins_ribbon_1: number,
      public dor_ribbon_1: number,
      public common_card_1_ribbon_1: number,
      public common_card_2_ribbon_1: number,
      public rare_card_1_ribbon_1: number,
      public rare_card_2_ribbon_1: number,
      public epic_card_1_ribbon_1: number,
      public epic_card_2_ribbon_1: number,
      public ucoins_ribbon_2: number,
      public dor_ribbon_2: number,
      public common_card_1_ribbon_2: number,
      public common_card_2_ribbon_2: number,
      public rare_card_1_ribbon_2: number,
      public rare_card_2_ribbon_2: number,
      public epic_card_1_ribbon_2: number,
      public epic_card_2_ribbon_2: number,
      public ucoins_ribbon_3: number,
      public dor_ribbon_3: number,
      public common_card_1_ribbon_3: number,
      public common_card_2_ribbon_3: number,
      public rare_card_1_ribbon_3: number,
      public rare_card_2_ribbon_3: number,
      public epic_card_1_ribbon_3: number,
      public epic_card_2_ribbon_3: number,
      public ucoins_ribbon_4: number,
      public dor_ribbon_4: number,
      public common_card_1_ribbon_4: number,
      public common_card_2_ribbon_4: number,
      public rare_card_1_ribbon_4: number,
      public rare_card_2_ribbon_4: number,
      public epic_card_1_ribbon_4: number,
      public epic_card_2_ribbon_4: number,
    ) {}
  }

  class reward
  {
    constructor(
      public common_card_1: number,
      public common_card_2: number,
      public rare_card_1: number,
      public rare_card_2: number,
      public epic_card_1: number,
      public epic_card_2: number,
    ) {}
  }

