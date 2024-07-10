class Matrix {
    constructor(rows=null, cols=null) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
    }
    
    getRow(){
        return this.rows
    }

    getCol(){
        return this.cols
    }

    getValue(row, col){
        return this.data[row][col]
    }

    getData(){
        return this.data
    }

    setValue(row, col, value){
        this.data[row][col] = value
    }

    addMatrix(matrix){
        if (this.rows !== matrix.rows || this.cols !== matrix.cols){
            console.log("Matrix size must be the same")
        }
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                this.data[i][j] += matrix.data[i][j]
            }
        }
    }

    subMatrix(matrix) {
        if (this.rows !== matrix.rows || this.cols !== matrix.cols){
            console.log("Matrix size must be the same")
            return
        }
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                this.data[i][j] -= matrix.data[i][j]
            }
        }
    }

    mulMatrix(matrix) {
        if (this.cols !== matrix.rows){
            console.log("Matrix size must be the same")
            return
        }
        let result = new Matrix(this.rows, matrix.cols)
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < matrix.cols; j++){
                for (let k = 0; k < this.cols; k++){
                    result.data[i][j] += this.data[i][k] * matrix.data[k][j]
                }
            }
        }
        this.data = result.data
        this.cols = matrix.cols
    }

    mulMatrixWithScalar(scalar){
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                this.data[i][j] *= scalar
            }
        }
    }

    tranMatrix(){
        let result = new Matrix(this.cols, this.rows)
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                result.data[j][i] = this.data[i][j]
            }
        }
        this.data = result.data
        this.rows = result.rows
        this.cols = result.cols
    }

    assignMatrix(matrix){
        this.cols = matrix.cols
        this.rows = matrix.rows
        this.data = matrix.data
        return matrix
    }
}

class SquareMatrix extends Matrix {
    constructor(rows=null, cols=null) {
        super(rows, cols)
        if (rows !== cols){
            console.log("Matrix must be square")
            return
        }
    }

    detMatrix(){
        if (this.rows === 2){
            return this.data[0][0] * this.data[1][1] - this.data[0][1] * this.data[1][0]
        }
        let det = 0
        for (let i = 0; i < this.rows; i++){
            let temp = new SquareMatrix(this.rows-1, this.cols-1)
            for (let j = 1; j < this.rows; j++){
                for (let k = 0; k < this.cols; k++){
                    if (k < i){
                        temp.data[j-1][k] = this.data[j][k]
                    } else if (k > i){
                        temp.data[j-1][k-1] = this.data[j][k]
                    }
                }
            }
            det += this.data[0][i] * Math.pow(-1, i) * temp.detMatrix()
        }
        return det 
    }

    checkTriangularUpper(){
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                if (i > j && this.data[i][j] !== 0){
                    return false
                }
            }
        }
        return true
    }

    checkTriangularLower(){
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                if (i < j && this.data[i][j] !== 0){
                    return false
                }
            }
        }
        return true
    }

    checkSymmetrical(){
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                if (this.data[i][j] !== this.data[j][i]){
                    return false
                }
            }
        }
        return true
    }
}

class TriangularMatrix extends SquareMatrix {
    constructor(rows=null, cols=null) {
        super(rows, cols)
    }

    detMatrix(){
        let det = 1
        for (let i = 0; i < this.rows; i++){
            det *= this.data[i][i]
        }
        return det
    }
}

class SymmetricalMatrix extends SquareMatrix {
    constructor(rows=null, cols=null) {
        super(rows, cols)
    }
}

// main
const n = 3;
let matrixA = new Matrix(n,n);
let matrixB = new SquareMatrix(n,n);
let matrixC = new SquareMatrix(n,n);
let matrixTemp = new SquareMatrix(n,n);
let matrixD = new TriangularMatrix(n,n);
let matrixE = new TriangularMatrix(n,n);
let matrixTempA = new Matrix(n,n);

for (let i = 0; i < matrixA.getRow(); i++){
    for (let j = 0; j < matrixA.getCol(); j++){
        matrixA.setValue(i, j, i+j)
        matrixB.setValue(i, j, i-j+10)
        matrixC.setValue(i, j, i*j)
    }
}

for (let i = 0; i < matrixTemp.getRow(); i++){
    for (let j = 0; j < matrixTemp.getCol(); j++){
        if (i < j){
            matrixTemp.setValue(i, j, 0)
        } else {
            matrixTemp.setValue(i, j, i+j+10)
        }
    }
}

console.log(`Matrix temp`, matrixTemp.getData())
console.log(`Matrix temp is lower`, matrixTemp.checkTriangularLower())
matrixD.assignMatrix(matrixTemp)
console.log(`Triangular Matrix D lower`, matrixD.getData())

for (let i = 0; i < matrixTemp.getRow(); i++){
    for (let j = 0; j < matrixTemp.getCol(); j++){
        if (i > j){
            matrixTemp.setValue(i, j, 0)
        } else {
            matrixTemp.setValue(i, j, i-j+10)
        }
    }
}

console.log(`Matrix temp`, matrixTemp.getData())
console.log(`Matrix temp is upper`, matrixTemp.checkTriangularUpper())
matrixE.assignMatrix(matrixTemp)
console.log(`Triangular Matrix E upper`, matrixE.getData())

console.log(`Matrix A`, matrixA.getData())
console.log(`Square Matrix B`, matrixB.getData())
console.log(`Square Matrix C`, matrixC.getData())
console.log(`Triangular Matrix E`, matrixE.getData())

console.log(`Det of Triangular Matrix = `, matrixE.detMatrix())

matrixTempA.assignMatrix(matrixA)
matrixTempA.addMatrix(matrixB)
console.log(`Matrix A + B`, matrixTempA.getData())

matrixTempA.assignMatrix(matrixA)
matrixTempA.subMatrix(matrixB)
console.log(`Matrix A - B`, matrixTempA.getData())

matrixTempA.assignMatrix(matrixA)
matrixTempA.mulMatrix(matrixB)
console.log(`Matrix A * B`, matrixTempA.getData())

matrixTempA.assignMatrix(matrixA)
matrixTempA.mulMatrixWithScalar(5)
console.log(`Matrix A * 5`, matrixTempA.getData())

console.log(`Det matrix B`, matrixB.detMatrix())
console.log(`Det matrix E`, matrixE.detMatrix())
