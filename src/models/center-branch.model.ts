import { Entity, model, property } from "@loopback/repository";

@model()
export class CenterBranch extends Entity {
  @property({
    type: "number",
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: "string",
    required: true,
  })
  name: string;

  @property({
    type: "string",
  })
  address?: string;

  @property({
    type: "string",
  })
  phoneNumber?: string;

  constructor(data?: Partial<CenterBranch>) {
    super(data);
  }
}

export interface CenterBranchRelations {
  // describe navigational properties here
}

export type CenterBranchWithRelations = CenterBranch & CenterBranchRelations;
