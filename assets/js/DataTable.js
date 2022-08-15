  class DataTable {
    constructor(columns = [], data = [], {
        perPageLimit = 5, 
        rowClassName = 'data-row',
        cellClassName = 'data-cell',
        tableClassName = 'data-table',
        arrowIcon = 'arrow-icon',
        blockOption = 'block-option',
    }) {
      this.columns = columns;
      this.data = data;
      this.perPageLimit = perPageLimit;
      this.rowClassName = rowClassName;
      this.cellClassName = cellClassName;
      this.tableClassName = tableClassName;
      this.arrowIcon = arrowIcon;
      this.blockOption = blockOption;   
    }

    createTable($dataTableContainer) {
        const $table = document.createElement('table');
        $table.classList.add(this.tableClassName);  //////նոր կլաս  (ռեֆակտրինգ)
        this.table = $table;
        $dataTableContainer.appendChild(this.table);

        this.createThead();
        this.createTbody();
        this.renderData();
        this.createPagination();
        this.createInput();
        this.createSearchField();
    }    

    createThead() {
        const $thead = document.createElement('thead');
        const $tr = document.createElement('tr');
        const $thCheck = document.createElement('th')
        const $checkinput = document.createElement('input');
        $thCheck.appendChild($checkinput);
        $checkinput.setAttribute('type', 'checkbox');
        $checkinput.addEventListener('change', (event) =>{
                for(let i = 0; i < document.querySelectorAll('tbody tr').length; i++){
                    document.querySelectorAll('tbody tr input')[i].checked = $checkinput.checked ;
                }                    
            }
        )
        
        $tr.appendChild($thCheck)
    
        this.columns.forEach((item) => {
            const $th = document.createElement('th');
            $th.dataset.filterBy = '';
            $th.innerHTML = item;

            $th.addEventListener('click', (event) =>{
                let $clickedItem = event.target;
                if( $clickedItem.dataset.filterBy != (`${item}-asc`)) {
                    $clickedItem.dataset.filterBy = (`${item}-asc`);
                } else{
                    $clickedItem.dataset.filterBy = (`${item}-desc`);
                };
                this.testSort($clickedItem.dataset.filterBy);
            })
       
            $tr.appendChild($th);  
        });
            const $dltTh = document.createElement('th');
            $tr.appendChild($dltTh);
            $thead.appendChild($tr);
            this.table.appendChild($thead);
            // this.table.appendChild($checkThead);

    }
    
    createTbody() {
        const $tbody = document.createElement('tbody');
        this.table.appendChild($tbody);
    }
    
    renderData() {
        this.displayList(0, this.perPageLimit);
    }
        
    createPagination(){

            if(this.data.length > this.perPageLimit) {
                const paginationBox = document.createElement('div');
                const pageNumber = Math.ceil(this.data.length / this.perPageLimit);
                paginationBox.classList.add('pagination-box')
        
                for(let i = 1; i <= pageNumber; i++){
                    const $pageButton = document.createElement('button');
                    $pageButton.classList.add('page-item');
                    $pageButton.innerHTML = i;
                    paginationBox.appendChild($pageButton);

                    if( i == 1 ){
                        $pageButton.classList.add('page-active');
                    }
                }
        
                document.querySelector('.data-table-container').appendChild(paginationBox);
                document.querySelector('.page-info').appendChild(paginationBox);
                const dataTable = this;

                document.querySelectorAll('.page-item').forEach( (eachItem) => { 
                    eachItem.addEventListener('click', function(){
                    if(document.querySelector('.page-active')){
                        document.querySelector('.page-active').classList.remove('page-active');
                    }

                    this.classList.add('page-active');
                    let start = dataTable.perPageLimit * parseInt(this.innerHTML - 1);
                    let end = dataTable.perPageLimit + start
                    document.getElementsByTagName('tbody')[0].replaceChildren(); ////// էս փոխեմ նենց, որ this-ով ստանամ, որ ուրիշ թբոդիի չկպնեմ։
                    dataTable.displayList(start, end);
                    }   
                    ) 
                }) 
            }
    }

    createInput() {
        const $label = document.createElement('label');
        const $select = document.createElement('select');
        const dataTable = this;
    
        
        const $option1 = document.createElement('option');
        $option1.innerHTML = 5;
        const $option2 = document.createElement('option');
        $option2.innerHTML = 10;
        const $option3 = document.createElement('option');
        $option3.innerHTML = 15;
        const $option4 = document.createElement('option');
        $option4.innerHTML = 20;
    
        $select.appendChild($option1);
        $select.appendChild($option2);
        $select.appendChild($option3);
        $select.appendChild($option4);
    
        $label.appendChild($select);
        document.querySelector('.table-options').appendChild($label);
        $select.addEventListener('change', (event) => {
            this.table.querySelector('tbody').innerHTML = null;    
            document.querySelector('.page-info').innerHTML = null;
            dataTable.perPageLimit = +event.target.value;
            dataTable.createPagination();
            dataTable.renderData();
        })
    }
    
    displayList(startCount, endCount) {

        const eachPageItems = this.data.slice(startCount, endCount);
        
        eachPageItems.forEach((item) => {
            const $tr = document.createElement('tr');
            const $checkTd = document.createElement('td');
            const $checkInput = document.createElement('input')
            $checkInput.setAttribute('type', 'checkbox');
            $checkTd.appendChild($checkInput);
            $tr.appendChild($checkTd);
            $checkInput.classList.add('checked')
            

            for(const key in item) {
                const $td = document.createElement('td');
                $td.innerHTML = item[key];
                $tr.appendChild($td);
            }

            $checkInput.addEventListener('change',(event) => {

                for(let i = 0; i<document.querySelectorAll('tbody tr').length; i++){
                    const $checkedCount = document.querySelectorAll('tbody tr input:checked').length;
                    const $inputCount = document.querySelectorAll('tbody tr input').length
                    
                    if($checkedCount == $inputCount){
                        document.querySelector('thead tr input').checked = true
                    } else {
                        document.querySelector('thead tr input').checked = false
                    }
                }
            })

            const $deleteTd = document.createElement('td');
            const $tdBtn = document.createElement('button');
            const $iIcon = document.createElement('i');
            $iIcon.classList.add('fa');
            $iIcon.classList.add('fa-trash');
            $iIcon.dataset.currentRowId = item.id;
            $tdBtn.appendChild($iIcon)

            $iIcon.addEventListener('click', (event) => {
                const indexOfObject = this.data.findIndex(item => {
                    return item.id == event.target.dataset.currentRowId;
                });

                this.data.splice(indexOfObject, 1);
                this.table.querySelector('tbody').innerHTML = null;
                document.querySelector('.page-info').innerHTML = null;
                this.createPagination();           
                this.renderData();
            })

            $deleteTd.appendChild($tdBtn);
            $tr.appendChild($deleteTd);

            document.getElementsByTagName('tbody')[0].appendChild($tr);
        })
    }

    createCheck() {
        
    }

    testSort(currentElement) {
    
        this.data.sort((a, b) => {
            if(currentElement == 'id-asc'){
                return a.id - b.id
            } else  if(currentElement == 'id-desc'){
                return b.id - a.id
            } else if(currentElement == 'name-desc'){
                if(a.name > b.name){
                    return -1
                } else if(a.name < b.name){
                    return 1
                }
                return 0
            } else if(currentElement == 'name-asc'){
                if(a.name > b.name){
                    return 1
                } else if(a.name < b.name){
                    return -1
                }
                return 0
            } else if(currentElement == 'age-asc'){
                return a.age - b.age
            } else {
                return b.age - a.age
            }
        }) 
        this.table.querySelector('tbody').innerHTML = null; 
        document.querySelector('.page-info').innerHTML = null; 
        this.renderData();
        this.createPagination();
    }

    createSearchField(){
        const $input = document.createElement('input');
        $input.setAttribute("type", "search");
        $input.placeholder = 'search';
        document.querySelector('body').appendChild($input);
        
        $input.onchange = (event) => {
            const searchResult = [];
            let noResult = false;
            this.data.map((item) => {
                for(const key in item) {
                    if(item[key].toString().toLowerCase().startsWith($input.value.toLowerCase())){
                        searchResult.push(item);
                  }
                }
                document.querySelector('tbody').innerHTML = null;
            })

            if(searchResult.length > 0) {
                searchResult.forEach((item, index) => {
                    const $tr = document.createElement('tr');
                      
                    for(const key in item) {
                        const $td = document.createElement('td');
                        $td.innerHTML = item[key];
                        $tr.appendChild($td);
                      }
                               
                    document.getElementsByTagName('tbody')[0].appendChild($tr);
                  })
                } else {
                    const $tr = document.createElement('tr');
                    const $noResultTd = document.createElement('td');
                    $noResultTd.colSpan = '4';
                    $noResultTd.innerHTML = 'No Result';
                    $tr.appendChild($noResultTd);
                    document.querySelector('tbody').appendChild($tr);
                }
        }
    } 
}







export default DataTable

