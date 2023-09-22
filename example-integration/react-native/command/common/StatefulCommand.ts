interface StatefulCommand<DataType> {
  persistToStore(data: DataType): Promise<void>;
  persistToNative(data: DataType): Promise<void>;
}
