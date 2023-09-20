import { Observable } from 'rxjs';

export type Registries = Promise<string> | Observable<string> | string | Promise<Observable<string>>;
