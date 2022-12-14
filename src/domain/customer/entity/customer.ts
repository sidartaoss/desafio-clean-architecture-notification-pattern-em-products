import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";

export default class Customer extends Entity {

    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;
        this.validate();

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    isActive(): boolean {
        return this._active;
    }

    get address(): Address {
        return this._address;
    }

    validate() {
        if (this._id.length === 0) {
            this.notification.addError({
                message: "Id is required.",
                context: "customer"
            });
        }
        if (this._name.length === 0) {
            this.notification.addError({
                message: "Name is required.",
                context: "customer"
            });
        }
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is required to activate a customer.");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    changeAddress(address: Address) {
        this._address = address;
    }
}