# Notes

This repository contains notes on installation, configuration, and execution of Universal Database Optimizer (UDO).

## Evaluation Environment

The folder [00-environment](00_environment) contains notes on:
- [Virtualization](00_environment/virtualization.md)
- [PostgreSQL](00_environment/postgres.md)
- [MongoDB](00_environment/mongo.md)
- [Python](00_environment/python.md)

## Experiments

Conducted according to an amended version of the following research:

*T. F. Llano-Ríos, M. Khalefa and A. Badia, "Evaluating NoSQL Systems for Decision Support: An Experimental Approach," 2020 IEEE International Conference on Big Data (Big Data), 2020, pp. 2802-2811, doi: 10.1109/BigData50022.2020.9377881.*

DOI: [10.1109/BigData50022.2020.9377881](https://doi.org/10.1109/BigData50022.2020.9377881)

The folder [01-experiments](01_experiments) contains notes on:
- [config](01_experiments/config): the configuration introduced before execution of the queries
  - `drop_all_idx.js`: each experiment has an own dedicated command to drop the indexes
  - `add_db_config.js`: each query set of each experiment has a dedicated set of system parameters
  - `add_idx_config.js`: each query set of each experiment has a dedicated set of indexes
- [index](01_experiments/index): an indexed experiment
- [no-index](01_experiments/no-index): a non-indexed experiment
- [optim](01_experiments/optim): an indexed experiment according to the suggestions of UDO
- [ref](01_experiments/ref): reference to the original non-indexed and indexed experiments

Each experiment (`index`, `no-index` and `optim`) contains:
- `queries`: according to the experiment referred above organized in the sub-folders according to the experiment type
- `results`: organized in the sub-folders according to the experiment type

Each `results` consists of explained query executions and `results.csv`, which summarizes the execution times.

## Execution

- [02-Optimization](02_optimization/optimization.md) contains notes on optimization
- [03-Evaluation](03_evaluation/evaluation.md) contains notes on evaluation

