#!/bin/bash
for i in "01" "02" "03" "04" "05" "06";
	do
		echo "Day $i:"
		cd ./$i;
		echo "Solution 1:"
		node solution-1.js
		echo "Solution 2:"
		node solution-2.js
		cd ..
	done