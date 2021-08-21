import { isUpdateTable } from "../../core/models/table";
import { v4 as uuid } from 'uuid'
describe('table-model >', () => {
    describe('update-table-typeguard', () => {

        test('Returns false if the id is not a valid uuid', () => {
            expect(isUpdateTable({ id: 'string ', active: true })).toBeFalsy();
            expect(isUpdateTable({ id: '', active: true })).toBeFalsy()
            expect(isUpdateTable({ id: uuid(), active: true })).toBeTruthy()
        })

        test('Returns false if no data other than the id is defined', () => {
            expect(isUpdateTable({ id: uuid() })).toBeFalsy()
            expect(isUpdateTable({ id: uuid(), active: true })).toBeTruthy();
            expect(isUpdateTable({ id: uuid(), active: true, name: 'No name' })).toBeTruthy();
        });

        test('Returns false if the object contains extra keys', () => {
            expect(isUpdateTable({ id: uuid(), active: true, notinmodel: true }))
                .toBeFalsy();
        })
    })

})