class Barcode {

    constructor(div_id, code, data = {then: 1, broad: 3, height: 50}){
        this.div_id = div_id;
        this.code = code;
        this.then = data.then;
        this.broad = data.broad;
        this.height = data.height;
        this.barcodes = ['00110', '10001', '01001', '11000', '00101', '10100', '01100', '00011', '10010', '01010'];
    }

    createBaseDiv(){
        let main_div = document.getElementById(this.div_id);
        let base_div = document.createElement('div');

        base_div.setAttribute('id', 'barcode-generator-main-div');

        main_div.appendChild(base_div);

        return base_div.getAttribute('id');
    }

    createBar(base_div, type){

        let div = document.getElementById(base_div);
        let bar = document.createElement('div');

        bar.style.height = this.height;
        bar.style.border = 0;
        bar.style.float = 'left';

        if (type.substr(0, 1) === 'b') 
            bar.style.backgroundColor = 'black';
        else bar.style.backgroundColor = 'white';

        if (type.substr(1) === 't')
            bar.style.width = this.then;
        else bar.style.width = this.broad;

        div.appendChild(bar);
    }

    generateBarcode() {

        let base_div = this.createBaseDiv();

        for (let b1 = 9; b1 >= 0; b1--){
            for (let b2 = 9; b2 >= 0; b2--){
                let b = (b1 * 10) + b2;
                let text = '';
                for (let i = 1; i < 6; i++){
                    text += this.barcodes[b1].substr((i - 1), 1) + this.barcodes[b2].substr((i - 1), 1);
                }
                this.barcodes[b] = text;
            }
        }

        this.createBar(base_div, 'bt');
        this.createBar(base_div, 'wt');
        this.createBar(base_div, 'bt');
        this.createBar(base_div, 'wt');

        let text = this.code;

        if ((text.length % 2) !== 0)
            text = `0${text}`;

        while(text.length > 0){
            
            let i = Math.round(text.substr(0, 2));

            text = text.substr(text.length - (text.length - 2), (text.length - 2));

            let f = (this.barcodes[i] != '') ? this.barcodes[i] : '';
             
            for (let i = 1; i < 11; i += 2){

                let type_bar1 = (f.substr((i - 1), 1) == '0') ? 'bt' : 'bb';
                this.createBar(base_div, type_bar1);

                let type_bar2 = (f.substr(i, 1) == '0') ? 'wt' : 'wb';
                this.createBar(base_div, type_bar2);
            }
        }

        this.createBar(base_div, 'bb');
        this.createBar(base_div, 'wt');
        this.createBar(base_div, 'bt');
        
    }
}