export interface IAudit {
  createdDateTime?: string;
  createdBy?: string;
  modifiedBy?: string;
  modifiedDateTime?: string;
  deletedBy?: string;
  deletedDateTime?: string;
}

export class Audit {
  constructor(private props: Partial<IAudit>) {}

  get createdDateTime() {
    return this.props.createdDateTime;
  }
  get createdBy() {
    return this.props.createdBy;
  }
  get modifiedBy() {
    return this.props.modifiedBy;
  }
  get deletedBy() {
    return this.props.deletedBy;
  }
  get modifiedDateTime() {
    return this.props.modifiedDateTime;
  }
  get deletedDateTime() {
    return this.props.deletedDateTime;
  }

  set modifiedDateTime(prop: string) {
    this.props.modifiedDateTime = prop;
  }

  set modifiedBy(prop: string) {
    this.props.modifiedBy = prop;
  }

  set deletedDateTime(prop: string) {
    this.props.deletedDateTime = prop;
  }

  set deletedBy(prop: string) {
    this.props.deletedBy = prop;
  }
}
