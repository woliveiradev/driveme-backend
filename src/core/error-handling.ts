export type Either<L, R> = Error<L> | Data<R>;

class Error<T> {
  readonly error: T;

  private constructor(error: T) {
    this.error = error;
  }

  isError(): this is Error<T> {
    return true;
  }

  isData(): this is Data<never> {
    return false;
  }

  static create<T>(error: T): Error<T> {
    return new Error(error);
  }
}

class Data<T> {
  readonly data: T;

  private constructor(data: T) {
    this.data = data;
  }

  isError(): this is Error<never> {
    return false;
  }

  isData(): this is Data<T> {
    return true;
  }

  static create<T>(data: T): Data<T> {
    return new Data(data);
  }
}

export class Result {
  public static error<L, R>(error: L): Either<L, R> {
    return Error.create(error);
  }
  public static data<L, R>(data: R): Either<L, R> {
    return Data.create(data);
  }
}
