#!/bin/bash
for i in "01";
	do
		echo "Advent day $i:"
		cd ./$i;
		echo "Solution 1:"
		node solution-1.js
		echo "Solution 2:"
		node solution-2.js
		cd ..
	done