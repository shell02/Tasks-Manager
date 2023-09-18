import { SetMetadata } from "@nestjs/common";


export const NoAuthRequired = () => SetMetadata('noAuth', true);