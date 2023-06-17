import { expect, test } from '@playwright/test';
import { FaturaModel } from './fixtures/fatura.model';
import { deleteFaturaByHelper, postFatura } from './support/helpers';
import { FaturaPage } from './support/pages/faturas';
import data from './fixtures/fatura.json';

let faturaPage: FaturaPage;

test.beforeEach(({ page }) => {
    faturaPage = new FaturaPage(page);
})

test.describe('cadastro fatura', () => {
    test('deve poder cadastrar uma nova fatura', async ({ request }) => {

        // Dado que eu tenho uma nova fatura
        const fatura = data.sucess as FaturaModel

        await deleteFaturaByHelper(request, fatura.name);

        // E que estou na página de novas fatura
        await faturaPage.go();
        await faturaPage.create(fatura);
        await faturaPage.shouldHaveText(fatura.name);
    });

    test('não deve permitir fatura duplicada', async ({ request }) => {

        // Dado que eu tenho uma fatura que ainda não exista no banco
        const fatura = data.duplicate as FaturaModel

        await deleteFaturaByHelper(request, fatura.name);
        await postFatura(request, fatura);


        // E que estou na página de novas fatura
        await faturaPage.go();
        // Quando faço o cadastro dessa tarefa
        await faturaPage.create(fatura);
        // Então essa fatura não deve ser cadastrada!
        await faturaPage.alertHaveText('Fatura já existe');

    });

    test('campo obrigatório na fatura', async () => {
        // Dado que eu tenho uma fatura que ainda não exista no banco
        const fatura = data.required as FaturaModel

        await faturaPage.go();
        await faturaPage.create(fatura);

        const validationMessage = await faturaPage.inputFaturaName.evaluate(e => (e as HTMLInputElement).validationMessage)
        expect(validationMessage).toEqual('this is a required field');
    });
});

test.describe('atualização', () => {
    test('deve concluir uma fatura', async ({ request }) => {
        //Teste independente, por isso criamos a fatura, deletamos caso ela exista no banco e recriamos.
        const fatura = data.update as FaturaModel;

        await deleteFaturaByHelper(request, fatura.name);
        await postFatura(request, fatura);

        await faturaPage.go();
        await faturaPage.toggle(fatura.name);
        await faturaPage.shouldBeDone(fatura.name);
    })
});

test.describe('deleção', () => {
    test('deve concluir uma fatura', async ({ request }) => {
        //Teste independente, por isso criamos a fatura, deletamos caso ela exista no banco e recriamos.
        const fatura = data.update as FaturaModel;

        await deleteFaturaByHelper(request, fatura.name);
        await postFatura(request, fatura);

        await faturaPage.go();
        await faturaPage.remove(fatura.name);
        await faturaPage.shouldNotExist(fatura.name);
    })
});




