# Notes

This repository contains notes on installation, configuration and execution of Universal Database Optimizer (UDO).

## Evaluation Environment

- [Virtualization](virtualization.md)
- [PostgreSQL](postgres.md)
- [MongoDB](mongo.md)
- [Python](python.md)

## Execution

- [Configuration](configuration.md)
- [Evaluation](evaluation.md)

## Experiments

Conducted according to an amended version of the following research:

*T. F. Llano-Ríos, M. Khalefa and A. Badia, "Evaluating NoSQL Systems for Decision Support: An Experimental Approach," 2020 IEEE International Conference on Big Data (Big Data), 2020, pp. 2802-2811, doi: 10.1109/BigData50022.2020.9377881.*

DOI: [10.1109/BigData50022.2020.9377881](https://doi.org/10.1109/BigData50022.2020.9377881)

The folder [experiments](experiments) contains:
- [config](experiments/config): the configuration introduced before execution of the queries
  - `drop_all_idx.js`: each experiment has an own dedicated command to drop the indexes
  - `add_ext_db_config.js`: each query set of each experiment has a dedicated set of system parameters
  - `add_ext_idx_config.js`: each query set of each experiment has a dedicated set of indexes
- [index](experiments/index): an indexed experiment
- [no-index](experiments/no-index): a non-indexed experiment
- [optim](experiments/optim): an indexed experiment according to the suggestions of UDO

Each experiment contains (`index`, `no-index` and `optim`):
- `queries`: according to the experiment referred above organized in the sub-folders according to the experiment type
- `results`: organized in the sub-folders according to the experiment type

Each `results` consists of explained query executions and `results.csv` which summarizes the execution times.
