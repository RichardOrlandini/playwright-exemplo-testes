import { expect, APIRequestContext} from '@playwright/test';
import { FaturaModel } from '../fixtures/fatura.model';

require('dotenv').config()
const BASE_API = process.env.BASE_API;

export async function deleteFaturaByHelper(request : APIRequestContext, faturaName : string){
    await request.delete(`${BASE_API}/helper/fatura/'${faturaName}`);
}

export async function postFatura(request : APIRequestContext, fatura : FaturaModel){
    const newFatura = await request.post(`${BASE_API}/fatura`, {data: fatura})
    expect(newFatura.ok()).toBeTruthy();
}