/* SystemJS module definition */
/* tslint:disable */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
interface NodeRequireFunction {
  (id: string): any;
}

interface NodeRequire extends NodeRequireFunction {
  cache: any;
  main: NodeModule | undefined;
}

declare var require: NodeRequire;

interface NodeModule {
  exports: any;
  require: NodeRequireFunction;
  id: string;
  filename: string;
  loaded: boolean;
  parent: NodeModule | null;
  children: NodeModule[];
}

declare var module: NodeModule;
