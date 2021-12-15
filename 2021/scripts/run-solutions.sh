#!/bin/bash
for i in "01" "02" "03" "04" "05" "06" "07" "08" "09" "10" "11" "12" "13" "14" "15";
	do
		echo "Day $i:"
		cd ./$i;
		echo "Solution 1:"
		node solution-1.js
		echo ""
		echo "Solution 2:"
		node solution-2.js
		echo ""
		echo ""
		cd ..
	done