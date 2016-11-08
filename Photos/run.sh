#!/bin/bash
CNT=0
for i in *.jpg;
do mv $i $CNT".jpg"
CNT=$(($CNT + 1));
done
