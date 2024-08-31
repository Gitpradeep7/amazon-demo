import { Inject, Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NetworkService } from './network.service';

export const authguardGuard: CanActivateFn = (route, state) => {
  
  return true;
};
