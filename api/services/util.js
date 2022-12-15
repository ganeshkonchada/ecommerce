module.exports = {
    calculateShippingCost(distance, weight){
        function getWeightCode(weight){
            if(weight <= 2) return "W1";
            else if(weight <= 5) return "W2";
            else if(weight <= 20) return "W3";
            else return "W4";
        }

        function getDistanceCode(distance){
            if(distance <= 5) return "D1";
            else if(distance <= 20) return "D2";
            else if(distance <= 50) return "D3";
            else if(distance <= 500) return "D4";
            else if(distance <= 800) return "D5";
            else return "D6";
        }

        let shippingCost = {
            W1: { D1: 12, D2: 15, D3: 30, D4:50, D5:100, D6: 220 },
            W2: { D1: 14, D2: 18, D3: 24, D4:55, D5:110, D6: 250 },
            W3: { D1: 16, D2: 25, D3: 30, D4:80, D5:130, D6: 270 },
            W4: { D1: 21, D2: 35, D3: 50, D4:90, D5:150, D6: 300 }
        };

        let distanceCode = getDistanceCode(distance);
        let weightCode = getWeightCode(weight);

        return shippingCost[weightCode][distanceCode];
    }
}